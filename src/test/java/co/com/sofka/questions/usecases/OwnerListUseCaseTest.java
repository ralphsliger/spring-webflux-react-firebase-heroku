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
import reactor.core.publisher.Flux;

import java.util.List;

@SpringBootTest
class OwnerListUseCaseTest {

    @MockBean
    QuestionRepository questionRepository;

    @SpyBean
    OwnerListUseCase ownerListUseCase;

    @Test
    void ownerListTest(){
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

        Mockito.when(questionRepository.findByUserId(questionDTO.getUserId())).thenReturn(Flux.just(question));

        var resultQuestionDTO =  ownerListUseCase.apply(questionDTO.getUserId()).collectList().block();

        assert resultQuestionDTO != null;
        Assertions.assertEquals(resultQuestionDTO.get(0).getId(), question.getId());
        Assertions.assertEquals(resultQuestionDTO.get(0).getUserId(), question.getUserId());
        Assertions.assertEquals(resultQuestionDTO.get(0).getQuestion(), question.getQuestion());
        Assertions.assertEquals(resultQuestionDTO.get(0).getType(), question.getType());
        Assertions.assertEquals(resultQuestionDTO.get(0).getCategory(), question.getCategory());
    }


}