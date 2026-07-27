package kr.co.teamb.dfsms.vo;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Alias("tcvo")
public class TopChartVO {
	private int productid;
	private int bestitem;
}
