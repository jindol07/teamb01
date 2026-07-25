package kr.co.teamb.dfsms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.teamb.dfsms.dao.StockDao;
import kr.co.teamb.dfsms.vo.OrderItemsVO;
import kr.co.teamb.dfsms.vo.OrderVO;
import kr.co.teamb.dfsms.vo.ProductsVO;

@Service
public class StockService {
	@Autowired
	private StockDao stockDao;

	public void stockUpdate(List<OrderItemsVO> oivo) {
		for (OrderItemsVO vo : oivo) {
			stockDao.stockUpdate(vo);
	    }
	}

	public void addOHistory(OrderVO ovo, List<OrderItemsVO> oivo) {
		for (OrderItemsVO vo : oivo) {
			stockDao.addOHistory(ovo, vo);
	    }
	}

	public void addPHistory(ProductsVO pvo) {
		stockDao.addPHistory(pvo);
	}

}
