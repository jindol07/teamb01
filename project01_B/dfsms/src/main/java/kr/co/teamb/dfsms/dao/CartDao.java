package kr.co.teamb.dfsms.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.teamb.dfsms.vo.CartVO;
import kr.co.teamb.dfsms.vo.OrderItemsVO;
import kr.co.teamb.dfsms.vo.OrderVO;

@Mapper
public interface CartDao {
	
	void addCart(Map<String, String> map);
	
	int cartPValid(Map<String, String> map);
	
	Map<String, Object> cartSValid(Map<String, String> map);
	
	List<Map<String, Object>> cartList(Map<String, String> map);
	
	void delCart(Map<String, String> map);
}
