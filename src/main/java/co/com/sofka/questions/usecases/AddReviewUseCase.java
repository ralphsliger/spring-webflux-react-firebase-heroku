package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Review;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

@Service
@Validated
public class AddReviewUseCase {
    private final QuestionRepository questionRepository;
    private final MapperUtils mapperUtils;
    private final UpdateQuestionUseCase updateQuestionUseCase;

    public AddReviewUseCase(QuestionRepository questionRepository, MapperUtils mapperUtils, UpdateQuestionUseCase updateQuestionUseCase) {
        this.questionRepository = questionRepository;
        this.mapperUtils = mapperUtils;
        this.updateQuestionUseCase = updateQuestionUseCase;
    }

    public Mono<QuestionDTO> addReview(Review review) {
        return questionRepository.findById(review.getQuestionId()).flatMap(
                question -> {
                    question.setNumberOfReviews(question.getNumberOfReviews()+1);
                    question.setReviewScores(question.getReviewScores()+Integer.parseInt(review.getScore()));
                    question.getUserReviews().add(review.getUserId());
                    question.setUserReviews(question.getUserReviews());
                    return  updateQuestionUseCase.apply(mapperUtils.mapEntityToQuestion().apply(question));
                }
        );
    }
}
