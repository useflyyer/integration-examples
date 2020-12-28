class ApplicationController < ActionController::Base
  before_action :set_flayyer

  def set_flayyer(&block)
    flayyer = Flayyer::FlayyerURL.create(&block)
    flayyer.tenant = "my-company" unless flayyer.tenant.present?
    flayyer.deck = "my-project" unless flayyer.deck.present?
    flayyer.template = "main" unless flayyer.template.present?
    image_src = flayyer.href.html_safe # https://github.com/flayyer/flayyer-ruby#ruby-on-rails

    social_image = {
      _: image_src,
    }
    # https://github.com/kpumuk/meta-tags#using-metatags-in-controller
    set_meta_tags({
      image_src: image_src,
      og: {
        image: social_image,
      },
      twitter: {
        image: social_image,
      },
    })
  end

  def root
    render "/index"
  end

  def about
    set_flayyer do |f|
      f.variables = { title: "About" }
    end
    render "/about"
  end
end
