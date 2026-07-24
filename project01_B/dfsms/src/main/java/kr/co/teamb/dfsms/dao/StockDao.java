package kr.co.teamb.dfsms.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kr.co.teamb.dfsms.vo.OrderItemsVO;
import kr.co.teamb.dfsms.vo.OrderVO;

@Mapper
public interface StockDao {
	
	void stockUpdate(OrderItemsVO oivo);
	
	void addHistory(@Param("ovo") OrderVO ovo, @Param("oivo") OrderItemsVO oivo);
	
}
