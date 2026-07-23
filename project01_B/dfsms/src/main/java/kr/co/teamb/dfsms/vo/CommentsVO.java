package kr.co.teamb.dfsms.vo;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Alias("commentVO")
public class CommentsVO {
	private int commentid;
	private int boardid;
	private int productid;
	private String writer;
	private String cont;
	private String rdate;
}
