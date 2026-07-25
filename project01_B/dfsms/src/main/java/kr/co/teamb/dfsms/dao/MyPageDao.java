package kr.co.teamb.dfsms.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MyPageDao {

	List<Map<String, Object>> orderHistory(Map<String, String> map);
	
}
