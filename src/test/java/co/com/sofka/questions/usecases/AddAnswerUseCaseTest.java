package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Answer;
import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AddAnswerUseCaseTest {
    @SpyBean
    AddAnswerUseCase addAnswerUseCase;

    @MockBean
    GetUseCase getUseCase;

    @MockBean
    AnswerRepository answerRepository;

    @Test
    void answer(){
        var questionDTO = new QuestionDTO("User01","¿Test?","Opinion","SOFTWARE DEVELOPMENT","prueba@gmail.com");
        var answerDTO = new AnswerDTO("Answer01","Question01","User01","Test Answer");

        var answer = new Answer();
        answer.setId("Answer01");
        answer.setQuestionId("Question01");
        answer.setUserId("User01");
        answer.setAnswer("Test Answer");

        Mockito.when(answerRepository.save(Mockito.any(Answer.class))).thenReturn(Mono.just(answer));
        Mockito.when(getUseCase.apply(Mockito.anyString())).thenReturn(Mono.just(questionDTO));


        var resultDTO = addAnswerUseCase.apply(answerDTO);
        var resultQuestionDTO = resultDTO.block();

        assert resultQuestionDTO != null;
        Assertions.assertEquals(resultQuestionDTO.getId(),questionDTO.getId());
        Assertions.assertEquals(resultQuestionDTO.getQuestion(),questionDTO.getQuestion());
        Assertions.assertEquals(resultQuestionDTO.getAnswers().get(0).getQuestionId(),answerDTO.getQuestionId());
    }
}