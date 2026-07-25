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
	//0724추가
	private int usrno;
	
//	1 대 N 관계
	private List<GalleryVO> galleryList;
//	private List<HistoryVO> historyList;
//	private List<OrderVO> orderList;
//	private List<CartVO> cartList;
}