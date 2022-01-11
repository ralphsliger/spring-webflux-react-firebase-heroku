package co.com.sofka.questions.usecases;

import static org.junit.jupiter.api.Assertions.*;
import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import static org.mockito.Mockito.when;
@SpringBootTest
class UpdateQuestionUseCaseTest {

    @SpyBean
    private UpdateQuestionUseCase updateQuestionUseCase;

    @MockBean
    private QuestionRepository repository;

    @Test
    void updateQuestionTest(){

        var questionDTO = new QuestionDTO("Question01","User01","¿html es un lenguaje de programación?","Opinion",
                "SOFTWARE DEVELOPMENT",3,1, List.of("1", "2"),  "prueba@gmail.com");

        var question = new Question();
        question.setId("Question01");
        question.setUserId("User01");
        question.setQuestion("¿html es un lenguaje de programación?");
        question.setType("Opinion");
        question.setCategory("SOFTWARE DEVELOPMENT");
        question.setNumberOfReviews(3);
        question.setReviewScores(2);
        question.setUserReviews(List.of("1","2"));
        question.setEmail("prueba@gmail.com");

        when(repository.save(Mockito.any(Question.class))).thenReturn(Mono.just(question));

        var result = updateQuestionUseCase.apply(questionDTO);

        Assertions.assertEquals(Objects.requireNonNull(result.block()).getId(),"Question01");
        Assertions.assertEquals(Objects.requireNonNull(result.block()).getUserId(),"User01");
        Assertions.assertEquals(Objects.requireNonNull(result.block()).getQuestion(),"¿html es un lenguaje de programación?");
        Assertions.assertEquals(Objects.requireNonNull(result.block()).getType(),"Opinion");
        Assertions.assertEquals(Objects.requireNonNull(result.block()).getCategory(),"SOFTWARE DEVELOPMENT");
        Assertions.assertEquals(Objects.requireNonNull(result.block()).getEmail(),"prueba@gmail.com");
        Assertions.assertEquals(Objects.requireNonNull(result.block()).getNumberOfReviews(),3);
        Assertions.assertEquals(Objects.requireNonNull(result.block()).getReviewScores(),2);

    }
}