import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";

import styles from './styles';
import Input from "../../src/components/Input";
import Button from "../../src/components/Button";
import CustomPicker from "../../src/components/CustomPicker";

const CreateCommunity = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [externalUrl, setExternalUrl] = useState('');

  const handleCommunityCreation = async () => {
    // TODO: Create community
    router.back();
  }

  useEffect(() => {
    // TODO: Pegar matérias do banco de dados
    setSubjects(["Matemática", "História", "Geografia"]);
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
                value={selectedSubject}
                setValue={setSelectedSubject}
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