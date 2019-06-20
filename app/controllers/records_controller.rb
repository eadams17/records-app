class RecordsController < ApplicationController
  helpers Sinatra::Param
  helpers ApplicationHelper

  before do
    content_type :json
  end

  get '' do
    param   :limit, Integer, default: 15
    param   :offset, Integer, default: 0
    param   :query, String

    data = File.read('./app/db.json')
    records = JSON.parse(data)
    p records.length
    records = records.sort { |record_a, record_b| record_a['artist']['name'] <=> record_b['artist']['name'] }

    if query = params['query']
        query = query.downcase
        records = records.select do |record|
            record['year'].to_s.downcase.match(query) || 
            record['album_title'].to_s.downcase.match(query) || 
            record['condition'].to_s.downcase.match(query) || 
            record['artist']['name'].to_s.downcase.match(query)
        end
    end

    limit = params['limit']
    offset = params['offset']
    records = records[offset, limit]

    Resources::ArtistsRecords.new(records).as_json
  end
end
