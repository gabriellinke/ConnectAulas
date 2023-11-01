import { useState } from "react";
import { View, Text, ToastAndroid, ScrollView } from "react-native";
import { router } from "expo-router";

import styles from './styles';
import Input from "../../src/components/Input";
import Button from "../../src/components/Button";
import CustomPicker from "../../src/components/CustomPicker";

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [choiceA, setChoiceA] = useState('');
  const [choiceB, setChoiceB] = useState('');
  const [choiceC, setChoiceC] = useState('');
  const [choiceD, setChoiceD] = useState('');
  const [answer, setAnswer] = useState();
  const [answers, setAnswers] = useState(['A','B','C','D']);

  const [page, setPage] = useState(1);

  const handleQuizCreation = async () => {
    // TODO: Create community
    router.back();
  }

  const validateInputAndAdvance = (page) => {
    switch(page) {
        case 1:
            if(title == "" || subject == "" || text == ""){
                ToastAndroid.show('Inputs inválidos!', ToastAndroid.LONG)
                console.log("Erro: Input não é válido");
                return;
            }
            break;
        case 2:
            if(choiceA == "" || choiceB == "" || choiceC == "" || choiceD == "" || answer == ""){
                ToastAndroid.show('Inputs inválidos!', ToastAndroid.LONG)
                console.log("Erro: Input não é válido");
                return;
            }
            handleQuizCreation();
            break;
        default:
            console.log("Erro: Tela inválida")
            return;
    }
    setPage(page+1);
  }

  return (
      <View style={styles.container}>
          <Text style={[styles.title, {marginTop: 16}]}>
              Cadastre uma nova{'\n'}questão
          </Text>
          {page == 1 ? (
            <>
              <Text style={styles.subtitle}>Enunciado da questão</Text>
              <View style={{marginTop: 80}}>
                  <Input label="Título*" value={title} setValue={setTitle} placeholder="Título da questão"/>
                  <Input label="Conteúdo*" value={subject} setValue={setSubject} placeholder="Matemática" />
                  <Input label="Enunciado*" value={text} setValue={setText} numberOfLines={3} placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore" />
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
          ) : (
            <>
              <Text style={[styles.subtitle ]}>Alternativas</Text>
              <ScrollView style={{paddingTop: 64 }}>
                <View style={{paddingBottom: 64}}>
                    <Input label="Alternativa A*" value={choiceA} setValue={setChoiceA} placeholder="Alternativa"/>
                    <Input label="Alternativa B*" value={choiceB} setValue={setChoiceB} placeholder="Alternativa"/>
                    <Input label="Alternativa C*" value={choiceC} setValue={setChoiceC} placeholder="Alternativa"/>
                    <Input label="Alternativa D*" value={choiceD} setValue={setChoiceD} placeholder="Alternativa"/>
                    <CustomPicker 
                      label="Alternativa correta*"
                      options={answers}
                      value={answer}
                      setValue={setAnswer}
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
export default CreateQuiz;