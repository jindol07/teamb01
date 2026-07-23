package kr.co.teamb.dfsms.vo;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Alias("ctgry")
public class CategoryVO {
	private int categoryid;
	private String categorynm;
}
