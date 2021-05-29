class ApplicationController < ActionController::Base
  before_action :set_flayyer

  def set_flayyer(&block)
    flayyer = Flayyer::FlayyerAI.create(&block)
    flayyer.project = "your-project-slug"
    flayyer.path = request.path

    # use html_safe to prevent double serialization
    image_src = flayyer.href.html_safe
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
