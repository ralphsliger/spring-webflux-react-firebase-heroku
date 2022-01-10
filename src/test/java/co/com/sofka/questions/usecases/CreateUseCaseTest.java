package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
class CreateUseCaseTest {


     CreateUseCase createUseCase;
     QuestionRepository repository;
     MapperUtils mapperUtils;

    @BeforeEach
    public void config() {
        MapperUtils mapperUtils = new MapperUtils();
        repository = mock(QuestionRepository.class);
        createUseCase = new CreateUseCase(mapperUtils,repository);
    }

    @Test
    void create(){
        var questionDTO = new QuestionDTO(
               "Question01",
               "User01",
               "¿Es la programación dificil?",
               "Opinion",
                "SOFTWARE DEVELOPMENT",
                1,
                1,
                List.of("1", "2"),
                "prueba@email.com"
        );

        var question = new Question();
        question.setId("Question01");
        question.setUserId("User01");
        question.setEmail("prueba@gmail.com");
        question.setType("Opinion");
        question.setCategory("SOFTWARE DEVELOPMENT");
        question.setNumberOfReviews(1);
        question.setReviewScores(1);
        question.setUserReviews(List.of("1", "2"));
        question.setQuestion("¿Es la programación dificil?");

        when(repository.save(Mockito.any(Question.class))).thenReturn(Mono.just(question));

        StepVerifier.create(createUseCase.apply(questionDTO)).expectNextMatches(
                id -> {
                     assert id.equals(questionDTO.getId());
                     return true;
                }).verifyComplete();
        verify(repository).save(Mockito.any(Question.class));

    }

}