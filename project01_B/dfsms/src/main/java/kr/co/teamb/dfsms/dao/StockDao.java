package kr.co.teamb.dfsms.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kr.co.teamb.dfsms.vo.CommunityVO;
import kr.co.teamb.dfsms.vo.HistoryVO;
import kr.co.teamb.dfsms.vo.OrderItemsVO;
import kr.co.teamb.dfsms.vo.OrderVO;
import kr.co.teamb.dfsms.vo.ProductsVO;

@Mapper
public interface StockDao {
	
	void stockUpdate(OrderItemsVO oivo);
	
	void addOHistory(@Param("ovo") OrderVO ovo, @Param("oivo") OrderItemsVO oivo);
	
	void addPHistory(ProductsVO pvo);
	
	List<Map<String, Object>> selectStockList(Map<String, String> map);
	
	int totCnt(Map<String, String> map);
	
	int delProduct(int productid);
	
	List<HistoryVO> selectHistory(Map<String, String> map);
	int historyTotCnt(Map<String, String> map);
	
	HistoryVO detailHistory(int historyid);
	
	int updateProduct(HistoryVO vo);
	int updateHistory(HistoryVO vo);
	
}
