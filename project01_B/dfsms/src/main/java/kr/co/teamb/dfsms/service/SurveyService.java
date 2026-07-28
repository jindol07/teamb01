package kr.co.teamb.dfsms.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.teamb.dfsms.dao.SurveyDao;
import kr.co.teamb.dfsms.vo.SurveyAnswerVO;
import kr.co.teamb.dfsms.vo.SurveyQuestionVO;
import kr.co.teamb.dfsms.vo.SurveyVO;
import tools.jackson.databind.ObjectMapper;

@Service
public class SurveyService {
	@Autowired
	private SurveyDao surveyDao;
	@Autowired
	private ObjectMapper objectMapper;
	@Transactional
	public void saveSurvey(SurveyVO vo) {
		surveyDao.saveSurvey(vo);
		char count = 0;
		List<SurveyQuestionVO> questionList = new ArrayList<>();
		for (SurveyQuestionVO v : vo.getQuestionList()) {
			SurveyQuestionVO questionVO = new SurveyQuestionVO();
			questionVO.setQuestiontitle(v.getQuestiontitle());
			questionVO.setQuestiontype(v.getQuestiontype());
			String questionlistJson = objectMapper.writeValueAsString(v.getQuestionlist());
			System.out.println(questionlistJson);
			questionVO.setQuestionlistJson(questionlistJson);
			questionVO.setSort_order(count);
			questionList.add(questionVO);
			System.out.println(v.getQuestiontitle());
			count++;
		}
		surveyDao.saveSurveyQuestionList(questionList);
	}
	public Long getSurveyCount() {
		try {
			return surveyDao.getSurveyCount();
		} catch (Exception e) {
			System.out.println("db 출력 중 오류가 발생했습니다.");
			e.printStackTrace();
			return null;
		}
	}
	public List<SurveyVO> getSurveyList() {
		List<SurveyVO> surveyList = new ArrayList<>();
		for (int i = 0; i < surveyDao.getSurveyCount(); i++) {
			SurveyVO result = surveyDao.getSurveyQuestions((long) i + 1);
			if (result == null) {
				continue;
			} else {
				surveyList.add(result);
			}
		}
		return surveyList;
	}
	public SurveyVO getSurvey(long num) {
		SurveyVO result = surveyDao.getSurvey(num);
		if (result == null) {
			return null;
		}
		return result;
	}
	public SurveyVO getSurveyQuestions(long num) {
		SurveyVO result = surveyDao.getSurveyQuestions(num);
		if (result == null) {
			return null;
		}
		return result;
	}
	public void insertSurveyAnswers(List<SurveyAnswerVO> list) {
		System.out.println(123123);
		try {
			for (SurveyAnswerVO item : list) {
				String answerdataJson = objectMapper.writeValueAsString(item.getAnswerdata());
				item.setAnswerdataJson(answerdataJson);
			}
			surveyDao.insertSurveyAnswers(list);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
