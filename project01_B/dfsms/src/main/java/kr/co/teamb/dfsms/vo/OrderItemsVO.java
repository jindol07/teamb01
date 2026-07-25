package kr.co.teamb.dfsms.vo;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Alias("oivo")
public class OrderItemsVO {
	private int orderid;
	private int productid;
	private int categoryid;
	private int qty;
	private int price;
	//0724 추가
	private String pnm;
	private String title;
	private String cont;
	private int pqty;
}
