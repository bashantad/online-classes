module StocksHelper
	def display_yes_no(flag)
		flag ? 
			"<span style='color:green'>Y</span>".html_safe 
			: "<span style='color:red'>N</span>".html_safe
	end
end
