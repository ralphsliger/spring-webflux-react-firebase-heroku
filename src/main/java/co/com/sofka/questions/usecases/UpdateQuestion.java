package co.com.sofka.questions.usecases;

import co.com.sofka.questions.model.QuestionDTO;
import reactor.core.publisher.Mono;

import javax.validation.Valid;

@FunctionalInterface
public interface UpdateQuestion {
    Mono<QuestionDTO> apply(@Valid QuestionDTO questionDTO);
}
