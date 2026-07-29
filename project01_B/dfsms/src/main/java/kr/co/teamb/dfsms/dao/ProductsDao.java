package kr.co.teamb.dfsms.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.teamb.dfsms.vo.GalleryVO;
import kr.co.teamb.dfsms.vo.ProductsVO;

@Mapper
public interface ProductsDao {
//	1. 전체 상품 리스트
	List<Map<String, Object>> selectProductList(Map<String, String> map);

//	2. 상품 상세 조회
	ProductsVO selectProductDetail(int productid);
	
	int totalCount(Map<String, String> map);

	void addProduct(ProductsVO pvo);

	void addImg(List<GalleryVO> gvo);
	
	ProductsVO selDetailTemp(Map<String, String> map);
}