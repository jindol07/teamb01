package kr.co.teamb.dfsms.vo;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Alias("ovo")
public class OrderVO {
	private int orderid;
	private int usrno;
	private int totprice;
	private String delyn;
	private String rdate;
	//1:N 즉 collection관계 
    private List<OrderItemsVO> orderitemlist;
}