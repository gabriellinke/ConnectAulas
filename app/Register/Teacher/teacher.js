import { useState, useRef, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ToastAndroid, ScrollView } from "react-native";
import { Camera, CameraType } from 'expo-camera';
import { router } from 'expo-router';
import { useAuth, useFirestore, useStorage } from "reactfire";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import styles from '../styles';
import * as Colors from '../../../src/styles/colors'
import Button from "../../../src/components/Button";
import Input from "../../../src/components/Input";
import CustomPicker from "../../../src/components/CustomPicker";
import { blobFromUri } from "../../../src/utils/image";
import { getErrorMessage } from "../../../src/utils/firebase/errors";

const Teacher = () => {
    const [page, setPage] = useState(1);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [biography, setBiography] = useState("");
    const [selectedSubject, setSelectedSubject] = useState();
    const [price, setPrice] = useState("");
    const [schedules, setSchedules] = useState([{weekDay: "", startTime: "", endTime: ""}]);
    
    const [type, setType] = useState(CameraType.back);
    const [permission, setPermission] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [takingPhoto, setTakingPhoto] = useState(false);
    const cameraRef = useRef(null);

    const [subjects, setSubjects] = useState([]);
    const weekDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

    const auth = useAuth();
    const storage = useStorage();
    const firestore = useFirestore();

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    async function getCameraPermission() {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === 'granted') {
            // You have camera permission
            setPermission(true);
            setTakingPhoto(true);
            console.log("Permissão de câmera concedida!");
        } else {
            ToastAndroid.show('Permissão não concedida. Você não poderá tirar fotos!', ToastAndroid.LONG)
            console.log("Você não poderá tirar fotos sem conceder permissão");
            // Permission denied
        }
    }

    const handleAccountCreation = async () => {
        console.log("Cadastro do aluno");
        console.log({
            email,
            password,
            name,
            phone,
            biography,
            photo,
            subject: selectedSubject,
            price,
            schedules
        })

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const blob = await blobFromUri(photo.uri);
            const storageRef = ref(storage, `userImage/${userCredential.user.uid}.png`);

            await uploadBytes(storageRef, blob);

            const photoUrl = await getDownloadURL(storageRef);
            
            await updateProfile(userCredential.user, {
                displayName: name,
                photoURL: photoUrl,
            });

            await setDoc(doc(firestore, "teachers", userCredential.user.uid), {
                userUid: userCredential.user.uid,
                name,
                photoUrl,
                subject: selectedSubject,
                hourlyRate: price,
                phoneNumber: phone,
                biography,
                communities: [],
                questions: [],
                availableTimes: schedules,
            });

            ToastAndroid.show("Cadastro concluído!", ToastAndroid.LONG);

            router.back();
        }
        catch (err) {
            if (err instanceof FirebaseError) {
                ToastAndroid.show(getErrorMessage(err), ToastAndroid.LONG);
                console.error(err)
            }
            else {
                throw err;
            }
        }
    }

    useEffect(() => {
        setSubjects(["Matemática", "História", "Geografia", "Português", "Biologia", "Física", "Química", "Artes", "Educação Física", "Inglês", "Filosofia", "Sociologia"]);
    }, [])

    const validateInputAndAdvance = (page) => {
        switch(page) {
            case 1:
                if(email === "" || password === ""){
                    ToastAndroid.show('Inputs inválidos!', ToastAndroid.LONG)
                    console.log("Erro: Input não é válido");
                    return;
                }
                break;
            case 2:
                if(name === "" || phone === "" || biography === ""){
                    ToastAndroid.show('Inputs inválidos!', ToastAndroid.LONG)
                    console.log("Erro: Input não é válido");
                    return;
                }
                break;
            case 3:
                if(!photo){
                    ToastAndroid.show('Inputs inválidos! Foto é necessária', ToastAndroid.LONG)
                    console.log("Erro: Input não é válido - você precisa tirar uma foto")
                    return;
                }
                break;
            case 4:
                if(price === "" || selectedSubject === ""){
                    ToastAndroid.show('Inputs inválidos!', ToastAndroid.LONG)
                    console.log("Erro: Input não é válido");
                    return;
                }
                break;
            case 5:
                const schedulesHasEmptyField = schedules.some(item => {
                    return Object.values(item).some(value => value === "");
                });
                if(schedulesHasEmptyField) {
                    ToastAndroid.show('Inputs inválidos! Preencha todos', ToastAndroid.LONG)
                    console.log("Erro: Input não é válido");
                    return;
                }
                handleAccountCreation();
                break;
            default:
                console.log("Erro: Tela inválida")
                return;
        }
        setPage(page+1);
    }

    const updateImage = async () => {
        getCameraPermission();
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setPhoto(photo);
            setTakingPhoto(false);
            console.log(photo);
        }
    }

    return (
        <View>
            <Text style={[styles.title, {marginTop: 16}]}>
                Cadastre-se como {'\n'}Professor
            </Text>
            {page == 1 ? (
                <>
                    <Text style={styles.subtitle}>Informações para acesso</Text>
                    <View style={{marginTop: 80}}>
                        <Input label="Email*" value={email} setValue={setEmail} placeholder="email@example.com"/>
                        <Input label="Senha*" value={password} setValue={setPassword} isPassword placeholder="*********"/>
                        <View style={[styles.buttonGroup, {marginTop: 16}]}>
                            <Button 
                                text="Voltar" 
                                width={'48%'} 
                                height={56} 
                                type={"purple"}
                                onPress={() => router.back()}
                            />
                            <Button
                                text="Próximo"
                                width={'48%'} 
                                height={56} 
                                type={"green"}
                                onPress={() => validateInputAndAdvance(page)}
                            />
                        </View>
                    </View>
                </>
            ): page == 2 ? (
                <>
                    <Text style={styles.subtitle}>Seus dados - informações gerais</Text>
                    <View style={{marginTop: 80}}>
                        <Input label="Nome*" value={name} setValue={setName} placeholder="Nome Sobrenome"/>
                        <Input label="Número para contato*" value={phone} setValue={setPhone} placeholder="41 99999-9999" maskType="phone"/>
                        <Input label="Biografia*" value={biography} setValue={setBiography} numberOfLines={3} placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore"/>
                        <View style={[styles.buttonGroup, {marginTop: 16}]}>
                            <Button 
                                text="Voltar" 
                                width={'48%'} 
                                height={56} 
                                type={"purple"}
                                onPress={() => setPage(page-1)}
                            />
                            <Button
                                text="Próximo"
                                width={'48%'} 
                                height={56} 
                                type={"green"}
                                onPress={() => validateInputAndAdvance(page)}
                            />
                        </View>
                    </View>
                </>
            ): page == 3 ? (
                <>
                    <Text style={styles.subtitle}>Seus dados - foto de perfil</Text>
                    <View style={{marginTop: 80}}>
                        {takingPhoto ? (
                            <>
                                <View style={styles.cameraContainer}>
                                    <Camera style={styles.camera} type={type} ref={cameraRef}>
                                        <View >
                                            <TouchableOpacity onPress={toggleCameraType}>
                                                <Text style={{color: Colors.SHAPES_01}}>Virar Câmera</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </Camera>
                                </View>
                                <Button 
                                    text="Tirar foto"
                                    width={'100%'} 
                                    height={56} 
                                    type={"purple"}
                                    onPress={updateImage}
                                />
                            </>
                        ) : permission ? (
                            <>
                                <View style={styles.cameraContainer}>
                                    {photo ? (
                                        <Image source={{ uri: photo.uri }}  style={styles.camera}/>
                                    ) : (
                                        <View style={[styles.camera, , {backgroundColor: 'white'}]}/>
                                    )}
                                </View>
                                <Button 
                                    text="Atualizar foto" 
                                    width={'100%'} 
                                    height={56} 
                                    type={"purple"}
                                    onPress={() => {getCameraPermission(), setPhoto(null)}}
                                />
                            </>
                        ) : (
                            <>
                                <View style={styles.cameraContainer}>
                                    <View style={[styles.camera, , {backgroundColor: 'white'}]}/>
                                </View>
                                <Button 
                                    text="Adicionar foto" 
                                    width={'100%'} 
                                    height={56} 
                                    type={"purple"}
                                    onPress={getCameraPermission}
                                />
                            </>
                        )}
                        <View style={[styles.buttonGroup, {marginTop: 16}]}>
                            <Button 
                                text="Voltar" 
                                width={'48%'} 
                                height={56} 
                                type={"purple"}
                                onPress={() => setPage(page-1)}
                            />
                            <Button
                                text="Próximo"
                                width={'48%'} 
                                height={56} 
                                type={"green"}
                                onPress={() => validateInputAndAdvance(page)}
                            />
                        </View>
                    </View>
                </>
            ): page == 4 ? (
                <>
                    <Text style={styles.subtitle}>Sobre a aula</Text>
                    <View style={{marginTop: 80}}>
                        <CustomPicker 
                            label="Matéria"
                            options={subjects}
                            value={selectedSubject}
                            setValue={setSelectedSubject}
                        />
                        <Input label="Custo da sua hora/aula (em R$)*" value={price} setValue={setPrice} placeholder="50.00" maskType="price"/>
                        <View style={[styles.buttonGroup, {marginTop: 16}]}>
                            <Button 
                                text="Voltar" 
                                width={'48%'} 
                                height={56} 
                                type={"purple"}
                                onPress={() => setPage(page-1)}
                            />
                            <Button
                                text="Próximo"
                                width={'48%'} 
                                height={56} 
                                type={"green"}
                                onPress={() => validateInputAndAdvance(page)}
                            />
                        </View>
                    </View>
                </>
            ): (
                <>
                    <Text style={[styles.subtitle, {marginBottom: 16}]}>Horários disponíveis</Text>
                    <ScrollView style={{paddingTop: 64, marginBottom: 120}}>
                        <View style={{paddingBottom: 64}}>
                            <View >
                                {schedules.map((item, index) => {
                                    return(
                                        <View key={index} style={{marginBottom: 16}}>
                                            <CustomPicker 
                                                label="Dia da semana"
                                                options={weekDays}
                                                value={item.weekDay}
                                                setValue={(value) => {
                                                    if(value) {
                                                        const updatedSchedules = [...schedules];
                                                        updatedSchedules[index] = { ...item, weekDay: value };
                                                        setSchedules(updatedSchedules);
                                                    }
                                                }}
                                            />
                                            <View style={[styles.buttonGroup]}>
                                                <View style={{width: '48%'}}>
                                                    <Input 
                                                        label="Das*"
                                                        maskType="schedule"
                                                        value={item.startTime}
                                                        setValue={(value) => {
                                                            if(value) {
                                                                const updatedSchedules = [...schedules];
                                                                updatedSchedules[index] = { ...item, startTime: value };
                                                                setSchedules(updatedSchedules);
                                                            }
                                                        }}
                                                        placeholder="08:00"
                                                    />
                                                </View>
                                                <View style={{width: '48%'}}>
                                                    <Input 
                                                        label="Até*"
                                                        maskType="schedule"
                                                        value={item.endTime}
                                                        setValue={(value) => {
                                                            if(value) {
                                                                const updatedSchedules = [...schedules];
                                                                updatedSchedules[index] = { ...item, endTime: value };
                                                                setSchedules(updatedSchedules);
                                                            }
                                                        }}
                                                        placeholder="12:00"
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                            <Button 
                                text="Novo horário" 
                                width={'100%'} 
                                height={56} 
                                type={"purple"}
                                onPress={() => setSchedules([...schedules, {weekDay: "", startTime: "", endTime: ""}])}
                            />
                            <View style={[styles.buttonGroup, {marginTop: 16}]}>
                                <Button 
                                    text="Voltar" 
                                    width={'48%'} 
                                    height={56} 
                                    type={"purple"}
                                    onPress={() => setPage(page-1)}
                                />
                                <Button
                                    text="Finalizar"
                                    width={'48%'} 
                                    height={56} 
                                    type={"green"}
                                    onPress={() => validateInputAndAdvance(page)}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </>
            )}

        </View>
    );
};
export default Teacher;