package kr.co.teamb.dfsms.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.teamb.dfsms.vo.TopChartVO;

@Mapper
public interface TopChartDao {
	List<TopChartVO> topProductList();
}
