"""Writer for docutils."""

from pathlib import Path

from docutils import frontend
from docutils.writers import html5_polyglot as base_writer


class RevealjsTranslator(base_writer.HTMLTranslator):
    pass


class RevealjsWriter(base_writer.Writer):
    default_template = Path(__file__).parent / "template.txt"

    settings_spec = frontend.filter_settings_spec(
        base_writer.Writer.settings_spec,
        template=(
            f'Template file. (UTF-8 encoded, default: "{default_template}")',
            ["--template"],
            {"default": default_template, "metavar": "<file>"},
        ),
    )

    def __init__(self):
        super().__init__()
        self.translator_class = RevealjsTranslator
