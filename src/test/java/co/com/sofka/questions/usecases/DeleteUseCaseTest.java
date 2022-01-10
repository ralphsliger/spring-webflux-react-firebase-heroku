package co.com.sofka.questions.usecases;

import co.com.sofka.questions.reposioties.AnswerRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
@SpringBootTest
class DeleteUseCaseTest {

    @SpyBean
    private DeleteAnswerUseCase deleteAnswerUseCase;

    @MockBean
    private AnswerRepository repository;

    @Test
    void eliminar(){
        Mockito.when(repository.deleteById("Question01")).thenReturn(Mono.empty());
        var deleteUseCase = deleteAnswerUseCase.apply("Question01").block();
        assertNull(deleteUseCase);
    }

}