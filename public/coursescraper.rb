require 'nokogiri'
require 'open-uri'

BASE_URL = "http://met.guc.edu.eg/Courses/Catalogue.aspx?"
@file = File.open("seedCourses.js", "a")

def get_courses semester
  doc = Nokogiri::HTML(open("#{BASE_URL}semester=#{semester}"))
  rows = doc.css('.wideMainDataContainer .badgeContainer')

  rows.each do |row|
    code = row.at_css('.badgeHeader h3 span').content
    name = row.at_css('.badgeDetails h3 a').content
    @file.puts "Courses.insert({code: '#{code}', name: '#{name}', faculty: 'MET'});"
  end
end

(1..10).map do |i|
  Thread.new(i) do |i|
    get_courses i
  end
end.each(&:join)
