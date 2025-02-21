package co.com.sofka.questions.usecases;
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

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
class GetUseCaseTest {
    @MockBean
    private QuestionRepository questionRepository;
    @SpyBean
    private GetUseCase getQuestion;

    @Test
    void getUsecase(){

        var questionDTO = new QuestionDTO("Question01","User01","¿html es un lenguaje de programación?","Opinion",
                "SOFTWARE DEVELOPMENT",3,1, List.of("1", "2"),  "prueba@gmail.com");

        var question = new Question();
        question.setId("Question01");
        question.setUserId("User01");
        question.setQuestion("¿html es un lenguaje de programación?");
        question.setType("OPEN");
        question.setCategory("SOFTWARE DEVELOPMENT");
        question.setNumberOfReviews(3);
        question.setReviewScores(2);
        question.setUserReviews(List.of("1","2"));
        question.setEmail("prueba@gmail.com");

        Mockito.when(questionRepository.findById(Mockito.any(String.class))).thenReturn(Mono.just(question));

        var result = getQuestion.apply("Question01");

        Assertions.assertEquals(Objects.requireNonNull(result.block()).getQuestion(), "¿html es un lenguaje de programación?");
    }
}