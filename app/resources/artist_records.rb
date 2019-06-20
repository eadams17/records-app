class Resources
    class ArtistsRecords
        attr_reader :records

        def initialize(records)
            @records = records
        end

        def as_json(*)
            records_by_artist.to_json
        end

        def records_by_artist
            result = {}

            records.each do |record|
                artist_id = record['artist']['id']
                artist_name = record['artist']['name']
                result[artist_name] = { id: artist_id, records: [] } if result[artist_name].nil?
                result[artist_name][:records] = result[artist_name][:records] << record
            end

            result
        end
    end
end