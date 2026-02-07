import tomllib  # type: ignore[inresolved-import] - Pyodide uses Python >= 3.11
from docutils.core import publish_string
from myst_parser.docutils_ import Parser as MystParser

from rst2revealjs.reader import RevealjsReader
from rst2revealjs.writer import RevealjsWriter

reader = RevealjsReader()
writer = RevealjsWriter()


def publish_revealjs(source, source_type, settings_text):
    settings = tomllib.loads(settings_text)
    parser = MystParser() if source_type == "Markdown" else None
    try:
        output = publish_string(
            source,
            reader=reader,
            writer=writer,
            settings_overrides={
                "revealjs_theme": settings.get("settings", {}).get("theme", "black"),
            },
            parser=parser,
        ).decode()
        return output
    except Exception as ex:
        print(ex)
        pass
