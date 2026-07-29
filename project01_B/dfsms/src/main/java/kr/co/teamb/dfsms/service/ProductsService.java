package kr.co.teamb.dfsms.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.teamb.dfsms.dao.ProductsDao;
import kr.co.teamb.dfsms.vo.GalleryVO;
import kr.co.teamb.dfsms.vo.ProductsVO;

@Service
public class ProductsService {
	@Autowired
	private ProductsDao productsDao;
	@Autowired
	private StockService stockService;

//	1. 전체 상품 리스트
	public List<Map<String, Object>> selectProductList(Map<String, String> map) {
	    return productsDao.selectProductList(map);
	}

//	2. 상품 상세 조회
	public ProductsVO selectProductDetail(int productid) {
		return productsDao.selectProductDetail(productid);
	}

	public int totalCount(Map<String, String> map) {
		return productsDao.totalCount(map);
	}
	
	@Transactional
	public void transcationProcess(ProductsVO pvo, List<GalleryVO> gvoList) {
		productsDao.addProduct(pvo);
		productsDao.addImg(gvoList);
		stockService.addPHistory(pvo);
	}

	public ProductsVO selDetailTemp(Map<String, String> map) {
		return productsDao.selDetailTemp(map);
	}

}