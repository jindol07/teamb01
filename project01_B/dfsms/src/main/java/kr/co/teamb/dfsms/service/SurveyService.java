package kr.co.teamb.dfsms.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.teamb.dfsms.dao.SurveyDao;
import kr.co.teamb.dfsms.vo.SurveyQuestionVO;
import kr.co.teamb.dfsms.vo.SurveyVO;

@Service
public class SurveyService {
	@Autowired
	private SurveyDao surveyDao;
	public Long getSurveyCount() {
		return surveyDao.getSurveyCount();
	}
	@Transactional
	public void saveSurvey(SurveyVO vo) {
		surveyDao.saveSurvey(vo);
//		char count = 0;
//		List<SurveyQuestionVO> questionList = new ArrayList<>();
//		for (SurveyQuestionVO v : vo.getQuestionList()) {
//			SurveyQuestionVO questionVO = new SurveyQuestionVO();
//			questionVO.setQuestiontitle(v.getQuestiontitle());
//			questionVO.setQuestiontype(v.getQuestiontype());
//			questionVO.setQuestionlist(v.getQuestionlist());
//			questionVO.setSort_order(count);
//			questionList.add(questionVO);
//			count++;
//		}
//		surveyDao.saveSurveyQuestionList(questionList);
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
	public SurveyVO getSurveyQuestions(long num) {
		SurveyVO result = surveyDao.getSurveyQuestions(num);
		if (result == null) {
			return null;
		} else {
			return result;
		}
	}
	public void incrementSurveyCount(int subcode, String surveytype) {
		surveyDao.incrementSurveyQuestion(subcode, surveytype);
	}
}
