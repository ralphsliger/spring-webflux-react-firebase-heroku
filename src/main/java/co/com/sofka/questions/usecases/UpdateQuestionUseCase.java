package co.com.sofka.questions.usecases;

import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

@Service
@Validated
public class UpdateQuestionUseCase implements UpdateQuestion{

    private final QuestionRepository questionRepository;
    private final MapperUtils mapperUtils;

    public UpdateQuestionUseCase(QuestionRepository questionRepository, MapperUtils mapperUtils) {
        this.questionRepository = questionRepository;
        this.mapperUtils = mapperUtils;
    }

    @Override
    public Mono<QuestionDTO> apply(QuestionDTO questionDTO) {
        return questionRepository.save(mapperUtils.mapperToQuestion(questionDTO.getId()).apply(questionDTO))
                .map(mapperUtils.mapEntityToQuestion());
    }
}
