package kr.co.teamb.dfsms.vo;

import java.sql.Date;
import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("ProductsVO")
@Getter
@Setter
public class ProductsVO {
	private int productid;
	private int categoryid;
	private String pnm;
	private int price;
	private int qty;
	private String title;
	private String cont;
	private int hit;
	private char delyn;
	private Date rdate;
	
//	1 대 N 관계
	private List<GalleryVO> galleryList;
//	private List<HistoryVO> historyList;
//	private List<OrderVO> orderList;
//	private List<CartVO> cartList;
//	해당 vo가 없어 오류 생겨서 주석처리함, 주석 해제하고 사용하시면 됩니다
}