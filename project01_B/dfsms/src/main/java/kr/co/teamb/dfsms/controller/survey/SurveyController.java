package kr.co.teamb.dfsms.controller.survey;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.teamb.dfsms.service.SurveyService;
import kr.co.teamb.dfsms.vo.SurveyAnswerVO;
import kr.co.teamb.dfsms.vo.SurveyQuestionVO;
import kr.co.teamb.dfsms.vo.SurveyVO;

@RestController
@RequestMapping("/api/survey")
public class SurveyController {
	@Autowired
	private SurveyService surveyService;
	
	@PostMapping("/addsurvey")
	public ResponseEntity<String> saveSurvey(@RequestBody SurveyVO vo) {
		System.out.println(vo);
		System.out.println(vo.getSurveytitle());
		surveyService.saveSurvey(vo);
		System.out.println("title: " + vo.getSurveytitle());
		return ResponseEntity.ok("success");
	}
	@GetMapping("/latest")
	public ResponseEntity<SurveyVO> getLatestSurvey() {
		Long lastItem = surveyService.getSurveyCount();
		if (lastItem == null) {
			System.out.println("현재 등록되거나 활성화된 설문조사가 없습니다.");
			return ResponseEntity.noContent().build();
		}
		SurveyVO surveyVO = surveyService.getSurveyQuestions(lastItem);
		if (surveyVO != null) {
			return ResponseEntity.ok(surveyVO);
		} else {
			System.out.println("no data");
			return ResponseEntity.noContent().build();
		}
	}
	@GetMapping("/detail/{num}")
	public ResponseEntity<SurveyVO> getSurvey(@PathVariable("num") Long num) {
		SurveyVO surveyVO = surveyService.getSurveyQuestions(num);
		if (surveyVO != null) {
			System.out.println(1);
			return ResponseEntity.ok(surveyVO);
		} else {
			System.out.println(2);
			return ResponseEntity.noContent().build();
		}
	}
	@GetMapping("/result/{num}")
	public ResponseEntity<SurveyVO> getSurveyResult(@PathVariable("num") Long num) {
		SurveyVO surveyVO = surveyService.getSurveyQuestions(num);
		if (surveyVO != null) {
			return ResponseEntity.ok(surveyVO);
		} else {
			return ResponseEntity.noContent().build();
		}
	}
	@GetMapping("/allList")
	public ResponseEntity<List<SurveyVO>> getAllSurvey() {
		List<SurveyVO> surveyList = surveyService.getSurveyList();
		if (surveyList != null) {
			return ResponseEntity.ok(surveyList);
		} else {
			return ResponseEntity.noContent().build();
		}
	}
	@PostMapping("/answers")
	public ResponseEntity<String> insertSurveyAnswers(@RequestBody List<SurveyAnswerVO> list) {
		try {
			surveyService.insertSurveyAnswers(list);
			return ResponseEntity.ok("update complete!");
		} catch (Exception e) {
			System.out.println(e);
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error");
		}
	}
//	@PostMapping("/tempsave")
	
	
	
	
	
	
	
	
}
