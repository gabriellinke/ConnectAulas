import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import { collection, addDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuth, useFirestore } from "reactfire";

import styles from './styles';
import Input from "../../src/components/Input";
import Button from "../../src/components/Button";
import CustomPicker from "../../src/components/CustomPicker";

const CreateCommunity = () => {
  const auth = useAuth();
  const firestore = useFirestore();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [externalUrl, setExternalUrl] = useState('');

  const teacherId = (auth.currentUser || {}).uid;

  const createNewCommunity = async (communityData) => {
    try {
      const communitiesCollectionRef = collection(firestore, "communities");
      const communityResponse = await addDoc(communitiesCollectionRef, communityData);
  
      const newCommunityRef = doc(firestore, `communities/${communityResponse.id}`);
  
      const teacherDocRef = doc(firestore, `teachers/${teacherId}`);
      await updateDoc(teacherDocRef, {
        communities: arrayUnion(newCommunityRef)
      });
  
      console.log(`Community created with ID: ${communityResponse.id}`);
      return communityResponse.id;
    } catch (error) {
      console.error("Error creating new community: ", error);
      throw error;
    }
  };

  const handleCommunityCreation = async () => {
    await createNewCommunity({
      name,
      description,
      subject,
      externalUrl,
      teacherId,
    });

    router.back();
  }

  useEffect(() => {
    setSubjects(["Matemática", "História", "Geografia", "Português", "Biologia", "Física", "Química", "Artes", "Educação Física", "Inglês", "Filosofia", "Sociologia"]);
  }, [])

  return (
      <View style={styles.container}>
          <Text style={[styles.title, {marginTop: 16}]}>
              Cadastre sua{'\n'}comunidade
          </Text>
          <View style={{marginTop: 80}}>
              <Input label="Nome*" value={name} setValue={setName} placeholder="Nome da comunidade"/>
              <Input label="Descrição*" value={description} setValue={setDescription} numberOfLines={3} placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore" />
              <CustomPicker 
                label="Matéria"
                options={subjects}
                value={subject}
                setValue={setSubject}
              />
              <Input label="Link para o grupo do whatsapp*" value={externalUrl} setValue={setExternalUrl} placeholder="https://chat.whatsapp.com/abc123"/>
              <View style={[styles.buttonGroup, {marginTop: 16}]}>
                  <Button
                      text="Criar cadastro"
                      width={'100%'} 
                      height={56} 
                      type={"green"}
                      onPress={handleCommunityCreation}
                  />
              </View>
          </View>
      </View>
  );
};
export default CreateCommunity;