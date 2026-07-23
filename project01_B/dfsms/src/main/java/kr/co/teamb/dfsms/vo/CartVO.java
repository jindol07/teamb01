package kr.co.teamb.dfsms.vo;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Alias("CartVO")
public class CartVO {
	private int usrno;
	private int productid;
	private int qty;
	private String rdate;

}