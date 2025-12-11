# The proper term is pseudo_replica_mode, but we use this compatibility alias
# to make the statement usable on server versions 8.0.24 and older.
/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=1*/;
/*!50003 SET @OLD_COMPLETION_TYPE=@@COMPLETION_TYPE,COMPLETION_TYPE=0*/;
DELIMITER /*!*/;
# at 4
#251210  9:01:11 server id 1  end_log_pos 126 CRC32 0x48216d87 	Start: binlog v 4, server v 8.0.44 created 251210  9:01:11 at startup
ROLLBACK/*!*/;
BINLOG '
R7g4aQ8BAAAAegAAAH4AAAAAAAQAOC4wLjQ0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAABHuDhpEwANAAgAAAAABAAEAAAAYgAEGggAAAAICAgCAAAACgoKKioAEjQA
CigAAYdtIUg=
'/*!*/;
# at 126
#251210  9:01:11 server id 1  end_log_pos 157 CRC32 0x08bd15c0 	Previous-GTIDs
# [empty]
SET @@SESSION.GTID_NEXT= 'AUTOMATIC' /* added by mysqlbinlog */ /*!*/;
DELIMITER ;
# End of log file
/*!50003 SET COMPLETION_TYPE=@OLD_COMPLETION_TYPE*/;
/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=0*/;
