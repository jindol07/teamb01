package kr.co.teamb.dfsms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.teamb.dfsms.dao.OrderDao;
import kr.co.teamb.dfsms.dao.StockDao;
import kr.co.teamb.dfsms.vo.OrderItemsVO;
import kr.co.teamb.dfsms.vo.OrderVO;

@Service
public class OrderService {
	@Autowired
	private OrderDao orderDao;
	@Autowired
	private StockService stockService;
	
	@Transactional
	public void transcationProcess(OrderVO ovo, List<OrderItemsVO> oivo) {
		orderDao.addOrder(ovo);
		orderDao.addOrderItems(oivo);
		stockService.stockUpdate(oivo);
		orderDao.delCartAftrOder(ovo);
		stockService.addOHistory(ovo, oivo);
	}

}
