package kr.co.teamb.dfsms.vo;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Alias("OrderVO")
public class OrderVO {
	private int orderid;
	private int usrno;
	private int productid;
	private int qty;
	private int price;
	private String delyn;
	private String rdate;

}