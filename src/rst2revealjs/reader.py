from docutils.readers.standalone import Reader

from . import transforms
from .engine import DEFAULT_VERSION


class RevealjsReader(Reader):
    settings_spec = Reader.settings_spec + (
        "Reveal.js Support Options",
        None,
        (
            (
                "Using version of Reveal.js (set latest by default).",
                ["--revealjs-version"],
                {"dest": "revealjs_version", "default": DEFAULT_VERSION},
            ),
            (
                "Reveal.js theme",
                ["--revealjs-theme"],
                {"dest": "revealjs_theme", "default": "black"},
            ),
            (
                "Highlight.js theme used in code highlighting.",
                ["--highlightjs-theme"],
                {"dest": "highlightjs_theme", "default": "monokai"},
            ),
        ),
    )

    def read(self, source, parser, settings):
        settings.doctitle_xform = False  # To force setting
        return super().read(source, parser, settings)

    def get_transforms(self):
        return super().get_transforms() + [
            transforms.RevealjsSectionizeTransform,
            transforms.RevealjsEngineTransform,
            transforms.TitleTransform,
        ]
