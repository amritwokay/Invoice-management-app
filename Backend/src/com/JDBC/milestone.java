package com.project;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.util.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.math.BigDecimal; 
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
public class milestone {

	public static void main(String[] args) {
		dbconnection();
		try {
			invoicedata();
		} catch (ParseException e) {
			e.printStackTrace();
		}
	}
	public static void invoicedata() throws ParseException {

        String csvFilePath = "C:\\Users\\KIIT\\Downloads\\1829126.csv";
        try {
            BufferedReader lineReader = new BufferedReader(new FileReader(csvFilePath));
            CSVParser records = CSVParser.parse(lineReader, CSVFormat.EXCEL.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());

            ArrayList<invoice> invoices = new ArrayList<>();
            for (CSVRecord record : records) {
                invoice invoice = new invoice();
                invoice.setBusinessCode(record.get(0));
                invoice.setCustNumber(record.get(1));
                invoice.setNameCustomer(record.get(2));
                if(record.get(3).isEmpty())
                	invoice.setClearDate("0000-00-00 00:00:00");
                else
                	invoice.setClearDate(record.get(3));
                invoice.setBusinessYear((int)Float.parseFloat(record.get(4)));
                invoice.setDocId(new BigDecimal(record.get(5)).longValue());
                invoice.setPostingDate(record.get(6));
                invoice.setDocumentCreateDate(Integer.parseInt(record.get(7)));
                invoice.setDueDate((int)Float.parseFloat(record.get(9)));
                invoice.setInvoiceCurrency(record.get(10));
                invoice.setDocumentType(record.get(11));
                invoice.setPostingId((int)Float.parseFloat(record.get(12)));
                invoice.setAreaBusiness(record.get(13));
                invoice.setTotalOpenAmount(Double.parseDouble(record.get(14)));
                invoice.setBaselineCreateDate((int)Float.parseFloat(record.get(15)));
                invoice.setCustPaymentTerms(record.get(16));
                if(record.get(17).isEmpty()){
                	invoice.setInvoiceId(-1);
                }else {
                	invoice.setInvoiceId((long)Double.parseDouble(record.get(17)));
                }
                invoice.setIsOpen(Integer.parseInt(record.get(18)));
                invoices.add(invoice);
            }
            PreparedStatement statement = null;
            Connection con = dbconnection();
            String sql = "INSERT INTO `invoice_details`(`business_code`, `cust_number`, `name_customer`, `clear_date`, `business_year`,"
            		+ " `doc_id`, `posting_date`,`document_create_date`, `due_in_date`, `invoice_currency`,`document_type`, `posting_id`,"
            		+ " `area_business`, `total_open_amount`, `baseline_create_date`, `cust_payment_terms`, `invoice_id`,`isOpen`) VALUES (? ,? ,? ,? ,? ,?,? ,? ,? ,? ,? ,? "
            		+ ",? ,? ,? ,? ,? ,?)";
            statement = con.prepareStatement(sql);
            String sDate6 = "0000-00-00 00:00:00";
            SimpleDateFormat formatter6=new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
            Date date6= formatter6.parse(sDate6); 
            for (invoice record : invoices) {
            	statement.setString(1, record.getBusinessCode());
            	statement.setString(2, record.getCustNumber());
            	statement.setString(3, record.getNameCustomer());
            	if(record.getClearDate() == date6)
            		statement.setNull(4, Types.DATE);
            	else
            		statement.setDate(4, record.getClearDate());
            	statement.setInt(5, record.getBusinessYear());
            	statement.setLong(6, record.getDocId());
            	statement.setDate(7, record.getPostingDate());
            	statement.setDate(8, record.getDocumentCreateDate());
            	statement.setDate(9, record.getDueDate());
            	statement.setString(10, record.getInvoiceCurrency());
            	statement.setString(11, record.getDocumentType());
            	statement.setInt(12, record.getPostingId());
            	statement.setString(13, record.getAreaBusiness());
            	statement.setDouble(14, record.getTotalOpenAmount());
            	statement.setDate(15, record.getBaselineCreateDate());
            	statement.setString(16, record.getCustPaymentTerms());
            	if(record.getInvoiceId() == -1)
            		statement.setNull(17, Types.BIGINT);
            	else
            		statement.setLong(17, record.getInvoiceId());
            	statement.setInt(18, record.getIsOpen());
//            statement.setInt(1, record.getStudentId());
//            statement.setString(2, record.getStudentName());

            statement.addBatch();
        }
        statement.executeBatch();
        con.commit();
        con.close();

    } catch (SQLException ex) {
        ex.printStackTrace();
    } catch (FileNotFoundException ex) {
        ex.printStackTrace();
    } catch (IOException ex) {
        ex.printStackTrace();
    }

}
public static Connection dbconnection() {

    Connection connection = null;
    try {
        Class.forName("com.mysql.jdbc.Driver");
        connection = DriverManager.getConnection("jdbc:mysql://localhost/?user=root&password=amrit");
        System.out.println("connection sucessfull");
        connection.setAutoCommit(false);
    } catch (ClassNotFoundException e) {
        e.printStackTrace();
    } catch (SQLException e) {
        e.printStackTrace();
    }
    return connection;
}

}


