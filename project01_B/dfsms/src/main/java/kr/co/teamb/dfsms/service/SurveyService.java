package kr.co.teamb.dfsms.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.teamb.dfsms.dao.SurveyDao;
import kr.co.teamb.dfsms.vo.SurveyContVO;
import kr.co.teamb.dfsms.vo.SurveyVO;

@Service
public class SurveyService {
	@Autowired
	private SurveyDao surveyDao;
	public Long maxSurveyNum() {
		return surveyDao.maxSurveyNum();
	}
	@Transactional
	public void saveSurvey(SurveyVO vo) {
		surveyDao.saveSurvey(vo);
		char stype = 'A';
		List<SurveyContVO> contList = new ArrayList<>();
		for (SurveyContVO c : vo.getContList()) {
			SurveyContVO contVO = new SurveyContVO();
			contVO.setSurveytitle(c.getSurveytitle());
			contVO.setSurveytype(String.valueOf(stype)); 
			contVO.setSurveycnt(0);
			contList.add(contVO);
			stype++;
		}
		surveyDao.saveSurveyContentList(contList);
	}
	public List<SurveyVO> getSurveyList() {
		List<SurveyVO> surveyList = new ArrayList<>();
		for (int i = 0; i < surveyDao.maxSurveyNum(); i++) {
			SurveyVO result = surveyDao.findBySNUM((long) i + 1);
			if (result == null) {
				continue;
			} else {
				surveyList.add(result);
			}
		}
		return surveyList;
	}
	public SurveyVO findBySNUM(Long num) {
		SurveyVO result = surveyDao.findBySNUM(num);
		if (result == null) {
			return null;
		} else {
			return result;
		}
	}
	public void incrementSurveyCount(int subcode, String surveytype) {
		surveyDao.incrementSurveyCount(subcode, surveytype);
	}
}
