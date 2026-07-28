package kr.co.teamb.dfsms.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.teamb.dfsms.dao.StockDao;
import kr.co.teamb.dfsms.vo.CommunityVO;
import kr.co.teamb.dfsms.vo.GalleryVO;
import kr.co.teamb.dfsms.vo.HistoryVO;
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

	public List<Map<String, Object>> selectStockList(Map<String, String> map) {

		return stockDao.selectStockList(map);
	}


	public int totCnt(Map<String, String> map) {
	
		return stockDao.totCnt(map);
	}
	
	public int delProduct(int productid) {
	
		return stockDao.delProduct(productid);
	}
	
	public List<HistoryVO> selectHistory(Map<String, String> map) {
		return stockDao.selectHistory(map);
	}

	public int historyTotCnt(Map<String, String> map) {
		return stockDao.historyTotCnt(map);
	}

	public HistoryVO detailHistory(int historyid) {
		
		return stockDao.detailHistory(historyid);
	}
	
	@Transactional
	public void transcationProcess(HistoryVO vo) {
		stockDao.updateProduct(vo);
		stockDao.updateHistory(vo);
	}
	
//	public int updateHistory(HistoryVO vo) {
//		return stockDao.updateHistory(vo);
//	}

}
