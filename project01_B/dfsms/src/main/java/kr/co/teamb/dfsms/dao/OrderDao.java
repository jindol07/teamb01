package kr.co.teamb.dfsms.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.teamb.dfsms.vo.OrderItemsVO;
import kr.co.teamb.dfsms.vo.OrderVO;

@Mapper
public interface OrderDao {
	//트랜젝션 처리 start
	void addOrder(OrderVO ovo);
	void addOrderItems(List<OrderItemsVO> oivo);
	void delCartAftrOder (OrderVO ovo);
	//트랜젝션 처리 end
}
