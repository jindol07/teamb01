package kr.co.teamb.dfsms.vo;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Alias("HistoryVO")
public class HistoryVO {
	private int historyid;
	private int productid;
	private int usrno;
	private String bfrpnm;
	private String updnm;
	private int bfrprice;
	private int updprice;
	private String bfrtitle;
	private String updtitle;
	private String bfrcont;
	private String updtcont;
	private int bfrqty;
	private int updtqty;
	private String gbn;
	private String rdate;
	
}