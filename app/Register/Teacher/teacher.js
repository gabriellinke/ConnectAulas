import { useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from '../styles';
import * as Colors from '../../../src/styles/colors'
import { Camera, CameraType } from 'expo-camera';
import { router } from 'expo-router';
import Button from "../../../src/components/Button";
import Input from "../../../src/components/Input";

const Teacher = () => {
    const [page, setPage] = useState(1);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [biography, setBiography] = useState("");

    const [type, setType] = useState(CameraType.back);
    const [permission, setPermission] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [takingPhoto, setTakingPhoto] = useState(false);
    const cameraRef = useRef(null);

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
            // TODO: Adicionar mensagem de erro
            console.log("Você não poderá tirar fotos sem conceder permissão");
            // Permission denied
        }
    }

    const handleAccountCreation = () => {
        console.log("Cadastro do aluno");
        // TODO: validar inputs
        // Enviar requisição para o backend
        // Mostrar mensagem de cadastro concluído
        router.back();
    }

    const validateInputAndAdvance = (page) => {
        switch(page) {
            case 1:
                if(email == "" || password == ""){
                    // TODO: Handle input inválido
                    console.log("Erro: Input não é válido");
                    return;
                }
                break;
            case 2:
                if(name == "" || phone == "" || biography == ""){
                    // TODO: Handle input inválido
                    console.log("Erro: Input não é válido");
                    return;
                }
                break;
            case 3:
                if(!photo){
                    // TODO: Handle input inválido
                    console.log("Erro: Input não é válido - você precisa tirar uma foto")
                    return;
                }
                break;
            case 4:
                break;
            case 5:
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
                        <Input label="Email*" value={email} setValue={setEmail}/>
                        <Input label="Senha*" value={password} setValue={setPassword} isPassword/>
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
                        <Input label="Nome*" value={name} setValue={setName}/>
                        <Input label="Número para contato*" value={phone} setValue={setPhone}/>
                        <Input label="Biografia*" value={biography} setValue={setBiography} numberOfLines={3}/>
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
                                                <Text style={{color: Colors.SHAPES_01}}>Flip Camera</Text>
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
                                    onPress={getCameraPermission}
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
                    <Text style={styles.subtitle}>Horários disponíveis</Text>
                    <View style={{marginTop: 80}}>
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
                                onPress={handleAccountCreation}
                            />
                        </View>
                    </View>
                </>
            )}

        </View>
    );
};
export default Teacher;