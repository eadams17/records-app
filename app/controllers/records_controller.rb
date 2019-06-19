class RecordsController < ApplicationController
  helpers Sinatra::Param
  helpers ApplicationHelper

  before do
    content_type :json
  end

  get '' do
    param   :limit, Integer, default: 25
    param   :offset, Integer, default: 0
    param   :query, String

    data = File.read('./app/db.json')
    records = JSON.parse(data)

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

    records.to_json
  end
end
