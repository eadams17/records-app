# This file is the configuration for rackup when writing Rack based Ruby applications
# 
# It requires the sinatra gem and it's sub-dependencies base and cross_origin

require 'sinatra/base'
require 'sinatra/cross_origin'
require 'sinatra/param'
require 'json'

# pull in the helpers and controllers
Dir.glob('./app/{helpers,controllers,models}/*.rb').each { |file| require file }

# map the controllers to routes
map('/') { run ApplicationController }
map('/records') { run RecordsController }