package kr.co.teamb.dfsms.vo;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Alias("chrtvo")
public class ChartVO {
	// 상품 탑5
	private int productid;
	private String pnm;
	private int price;
	private String imgnm;
	private int totqty;
	
	// 상품 카테고리별 통계
	private int categoryid;
	private String categorynm;
	private int ctgytotqty;
	private Double ctgyratio;
	private int qty;
	private String title;
}