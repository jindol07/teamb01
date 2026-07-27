package kr.co.teamb.dfsms.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kr.co.teamb.dfsms.vo.SurveyContVO;
import kr.co.teamb.dfsms.vo.SurveyVO;


@Mapper
public interface SurveyDao {
	void saveSurvey(SurveyVO vo);
	void saveSurveyContentList(List<SurveyContVO> list);
	void incrementSurveyCount(@Param("subcode") int subcode, @Param("surveytype") String surveytype);
	Long maxSurveyNum();
	SurveyVO findBySNUM(Long num);
}
